from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from.models import Blog, User

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class BlogSerializer(serializers.ModelSerializer):
    creator = UserDetailSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['id', 'creator', 'published_date']


# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = User
#         fields = ('username', 'password', 'password2', 'email')

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         return attrs

#     def create(self, validated_data):
#         validated_data.pop('password2')
#         user = User.objects.create_user(**validated_data)
#         return user