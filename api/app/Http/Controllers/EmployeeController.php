<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\EmployeeService;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        $employees = $this->employeeService->getAllEmployees();
        return response()->json(['employees' => $employees]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:employees',
            'phone' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:1000',
            'active' => 'boolean',
        ]);

        $employee = $this->employeeService->createEmployee($validated);
        return response()->json(['employee' => $employee], 201);
    }

    public function show($id)
    {
        $employee = $this->employeeService->getEmployeeById($id);
        return response()->json(['employee' => $employee]);
    }

    public function update(Request $request, $id)
    {
        $this->employeeService->getEmployeeById($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:employees,email,' . $id,
            'phone' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:1000',
            'active' => 'boolean',
        ]);

        $employee = $this->employeeService->updateEmployee($id, $validated);
        return response()->json(['employee' => $employee]);
    }

    
    public function destroy($id)
    {
        $this->employeeService->deleteEmployee($id);
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
