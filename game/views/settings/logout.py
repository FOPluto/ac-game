from django.http import JsonResponse
from django.contrib.auth import logout


def sign_out(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            "result": "success",
        })
    logout(request)
    return JsonResponse({
        "result": "success",
    })
    # 这个可以把cookie删掉
