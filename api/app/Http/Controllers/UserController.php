<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json(['users' => $users]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users'),
            ],
            'password' => 'required|string|min:8',
        ]);

        $user = $this->userService->createUser($validated);
        return response()->json(['user' => $user], 201);
    }

    public function show(User $user)
    {
        return response()->json(['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'sometimes|string|min:8',
        ]);

        $updatedUser = $this->userService->updateUser($user, $validated);
        return response()->json(['user' => $updatedUser]);
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return response()->json(['message' => 'Usuário apagado com sucesso.']);
    }
}
