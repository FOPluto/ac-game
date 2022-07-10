from django.contrib import admin

# 把这个定义好的表搞进来
from game.models.player.player import Player

admin.site.register(Player)
# Register your models here.
