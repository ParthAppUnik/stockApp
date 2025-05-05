from django.db import models

class Stock(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    macd = models.FloatField(null=True, blank=True)
    rsi = models.FloatField(null=True, blank=True)
    sma = models.FloatField(null=True, blank=True)
    volatility = models.FloatField(null=True, blank=True)
    signal_line = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.name} : ${self.price}"

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email
