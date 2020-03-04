<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Exceptions\GeneralException;

/**
 * Class AdministrasiController.
 */
class AdministrasiController extends Controller
{
    /**
     * @var ProductRepository
     */
    protected $products;

    /**
     * @param ProductRepository $products
     */
    public function __construct()
    {

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('backend.administrasi.index');
    }
    public function cek()
    {
        return view('backend.administrasi.create');
    }
}
