from urllib import request
from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data = request.GET
    username = data.get("username", "").strip()  # 将前后空格去掉
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()

    print("username:" + username)
    print("password:" + password)
    print("password_confirm:" + password_confirm)

    return JsonResponse({
        "result": "站主在更新中.....更新好了再来哦~"
    })

    if not username or not password:
        return JsonResponse({
            "result": "用户名和密码不能为空",
        })
    if not password_confirm:
        return JsonResponse({
            "result": "需要确认密码",
        })
    if password_confirm != password:
        return JsonResponse({
            "result": "两串密码不一致",
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            "result": "用户名被占用",
        })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(
        user=user, photo="https://cdn.acwing.com/media/user/profile/photo/119954_lg_ce603bf721.jpg")
    login(request, user)
    return JsonResponse({
        "result": "success",
    })
