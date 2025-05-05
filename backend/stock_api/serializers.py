from rest_framework import serializers
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    score = serializers.FloatField(read_only=True)
    """
    Serializer for the Stock model, converting model instances to JSON
    """
    class Meta:
        model = Stock
        fields = ['id', 'name', 'price', 'score']
        #fields = ['name','price']
        # read_only_fields = ['updated_at', 'created_at']