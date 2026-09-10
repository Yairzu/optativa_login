<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('api')->user();
        $isAdmin = $user && DB::table('rol')
            ->where('id_rol', $user->id_rol)
            ->where('tipo_rol', 'admin')
            ->exists();

        if ($isAdmin) {
            return $next($request);
        } else {
            return response()->json(['error' => 'You are not authorized to access this resource'], 403);
        }
    }
}
