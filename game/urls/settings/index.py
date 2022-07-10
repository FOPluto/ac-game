from django.urls import path, include
from game.views.settings.getinfo import getinfo
from game.views.settings.login import sign_in
from game.views.settings.logout import sign_out
from game.views.settings.register import register

urlpatterns = [
    path("getinfo/", getinfo, name="settings_getinfo"),
    path("login/", sign_in, name="settings_login"),
    path("logout/", sign_out, name="settings_logout"),
    path("register/", register, name="settings_register"),
]
# 返回一个字典：
# {"result": "success", "username": "FoPluto", "photo": "https://tse2-mm.cn.bing.net/th/id/OIP-C.IEjsnZGHb_AFAxrY7Xj_4gAAAA?w=174&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"}
