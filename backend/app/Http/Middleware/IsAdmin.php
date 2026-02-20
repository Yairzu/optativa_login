<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('api')->user();
        if($user && $user->id_rol == 1) {
            return $next($request);
        } else {
            return response()->json(['error' => 'You are not authorized to access this resource'], 403);
        }
    }
}
