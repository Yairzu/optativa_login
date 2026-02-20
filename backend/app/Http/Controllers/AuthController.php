<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Auth; 
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_user' => 'required|string|max:30',
            'surname_user' => 'required|string|max:30',
            'nick_user' => 'required|string|max:30|unique:user,nick_user',
            'password_user' => 'required|string|min:10|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        User::create([
            'name_user' => $request->name_user,
            'surname_user' => $request->surname_user,
            'nick_user' => $request->nick_user,
            'password_user' => Hash::make($request->password_user),
            'id_rol' => 2,
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }
    
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nick_user' => 'required|string|max:30',
            'password_user' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $credentials = [
            'nick_user' => $request->nick_user,
            'password'  => $request->password_user, 
        ];

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
            return $this->createNewToken($token);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token', 'message' => $e->getMessage()], 500);
        }
    }

    public function getuser(){
        return response()->json(Auth::user(), 200);
    }

    public function index(){
        $users = User::all(); 
        return response()->json($users, 200);
    }


    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'User logged out successfully'], 200);
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
