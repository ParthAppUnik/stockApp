from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
 


# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'stocks', views.StockViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
    path('simple/stocks/', views.stock_list_api, name='stock-list'),
    path('search/stocks/', views.stock_search_api, name='stock-search'),
    path('all-stocks/', views.get_all_stocks, name='all-stocks'),
   path('recommendations/', views.recommend_stocks, name='recommend-stocks'),
   path('login/', views.login, name='login'),
   path('signup/',views.signup, name='signup'),


    # path('', index, name='index')

]
