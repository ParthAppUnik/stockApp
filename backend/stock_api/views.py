from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Stock
from .serializers import StockSerializer
from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import User
#from stock_api.models import User  # 👈 import your model



@api_view(['POST', 'OPTIONS'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    print("Email: ", email)
    print("Password: ", password)

    try:
        user = User.objects.get(email=email)
        if user.password == password:
            print("Login successful")
            return Response({'message': 'Login successful!'})
        else:
            print("Invalid password")
            return Response({'message': 'Invalid credentials!'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        print("User not found")
        return Response({'message': 'Invalid credentials!'}, status=status.HTTP_401_UNAUTHORIZED)

    


@api_view(['POST'])
def signup(request):
    try:
        print('REQUEST DATA:', request.data)  
        email=request.data.get('email')
        password=request.data.get('password')
        

        if User.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists!'}, status=status.HTTP_400_BAD_REQUEST)
        user=User.objects.create(username=email,email=email,password=password)
        user.save()
        return Response({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



def stock_home(request):
    return render(request, 'index.html')
class StockViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows stocks to be viewed.
    """
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned stocks by filtering against
        query parameters in the URL.
        """
        queryset = Stock.objects.all()
        name_query = self.request.query_params.get('name', None)
        symbol_query = self.request.query_params.get('symbol', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if name_query:
            queryset = queryset.filter(name__icontains=name_query)
        if symbol_query:
            queryset = queryset.filter(symbol__iexact=symbol_query)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

@api_view(['GET'])
def stock_list_api(request):
    """
    Simple API endpoint to retrieve all stocks
    """
    stocks = Stock.objects.all()
    serializer = StockSerializer(stocks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def stock_search_api(request):
    """
    Search API endpoint to find stocks by name or symbol
    """
    query = request.query_params.get('q', '')
    if not query:
        return Response(
            {'error': 'Search query parameter "q" is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    stocks = Stock.objects.filter(
        Q(name__icontains=query) | Q(symbol__icontains=query)
    )
    serializer = StockSerializer(stocks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_stocks(request):
    """
    Simple endpoint to get all stocks from database
    """
    print("Fetching all stocks")
    stocks = Stock.objects.all()
    serializer = StockSerializer(stocks, many=True)
    return Response(serializer.data)



import json
import logging
import re
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Stock
from .indicators import indicators  # Import predefined indicators with descriptions
from groq import Groq
import os

# Initialize the Groq client (replace with your actual API key)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))  # ⚠️ Replace with your Groq API key

@api_view(['POST'])
def recommend_stocks(request):
    user_message = request.data.get('message', '').strip()

    if not user_message:
        return Response({"error": "No message provided."}, status=400)

    # Step 1: Fetch stock name and price
    stocks = Stock.objects.all().values('name', 'price')
    stock_data = [{'name': stock['name'], 'price': float(stock['price'])} for stock in stocks]

    # Step 2: Indicator reference data
    indicator_knowledge = json.dumps(indicators, indent=2)

    # Step 3: Prompt to extract relevant indicators & give recommendations
    prompt = f"""
You are a stock advisor assistant. The user will provide a prompt that may mention technical indicators like RSI, MACD, SMA, etc.

[INDICATORS]
{indicator_knowledge}

[STOCK DATA]
{json.dumps(stock_data, indent=2)}

[USER PROMPT]
{user_message}

TASK: 
1. Identify relevant indicators mentioned in the user prompt.
2. Based on those indicators and stock data, recommend:
   - Top 5 stocks to BUY
   - Top 5 stocks to SELL

Only return response in this strict JSON format:
{{
  "top_5_to_buy": ["Stock A", "Stock B", "Stock C", "Stock D", "Stock E"],
  "top_5_to_sell": ["Stock F", "Stock G", "Stock H", "Stock I", "Stock J"]
}}

Do not return explanation or additional commentary.
"""

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192",
        )

        raw_response = chat_completion.choices[0].message.content.strip()
        clean_response = re.sub(r'```(?:json)?(.*?)```', r'\1', raw_response, flags=re.DOTALL).strip()

        try:
            response_json = json.loads(clean_response)
            print(response_json)
            return Response({"response": response_json})
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON response from LLM"}, status=500)

    except Exception as e:
        return Response({"error": f"Internal error: {str(e)}"}, status=500)















