from django.contrib import admin
from .models import Stock

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    # search_fields = ('name', 'symbol')
    # list_filter = ('updated_at','created_at')
    # ordering = ('name',)