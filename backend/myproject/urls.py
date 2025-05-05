from django.contrib import admin
from django.urls import path, include  # ✅ Correct import here!
from stock_api.views import stock_home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stock_api.urls')),  # ✅ includes all your API routes like /api/recommend/
    path('', stock_home),  # main landing page
    path('api/recommendations/', include('stock_api.urls')), # ✅ includes all your API routes like /api/login/ and /api/logout/
]
