from django.db import models

from django.contrib.auth.models import User


class Player (models.Model):
    # 当我们user删除的时候，把关联的player一块删掉，就不会漏删了

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(max_length=256, blank=True)

    def __str__(self):
        # 这里就是返回user的名字
        return str(self.user)
