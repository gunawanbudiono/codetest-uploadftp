<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Request;
use App\Http\Requests\Frontend\FormPelamar\FormPelamarRequest;
use DB;
use Carbon;

/**
 * Class FrontendController.
 */
class FrontendController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('frontend.index');
    }

    public function formPost(FormPelamarRequest $request)
    {
        // dd($request->data_pelamars['tgl_lahir_anak1']);
        $data_pelamars = DB::table('data_pelamars')->insertGetId([
            'nama_lengkap' => $request->data_pelamars['nama'],
            'tempat_lahir' => $request->data_pelamars['tempat_lahir'],
            'tanggal_lahir' => $request->data_pelamars['tanggal_lahir'],
            'umur' => $request->data_pelamars['umur'],
            'jns_kelamin' => $request->data_pelamars['jns_kelamin'],
            'agama' => $request->data_pelamars['agama'],
            'alamat_tinggal' => $request->data_pelamars['alamat_tinggal'],
            'alamat_tinggal_kecamatan' => $request->data_pelamars['alamat_tinggal_kecamatan'],
            'alamat_tinggal_kota' => $request->data_pelamars['alamat_tinggal_kota'],
            'status_tempat_tinggal' => $request->data_pelamars['status_tempat_tinggal'],
            'no_tlp' => $request->data_pelamars['no_tlp'],
            'type_id' => '',
            'no_id' => $request->data_pelamars['no_id'],
            'no_id_berkalu' => null,
            'status_nikah' => $request->data_pelamars['status_nikah'],
            'nama_pasangan' => $request->data_pelamars['nama_pasangan'],
            'tgl_lahir_pasangan' => $request->data_pelamars['tgl_lahir_pasangan'],
            'nama_anak1' => $request->data_pelamars['nama_anak1'],
            'tgl_lahir_anak1' => $request->data_pelamars['tgl_lahir_anak1'],
            'nama_anak2' => $request->data_pelamars['nama_anak2'],
            'tgl_lahir_anak2' => $request->data_pelamars['tgl_lahir_anak2'],
            'nama_anak3' => $request->data_pelamars['nama_anak3'],
            'tgl_lahir_anak3' => $request->data_pelamars['tgl_lahir_anak3'],
            'nama_anak4' => null,
            'tgl_lahir_anak4' => null,
            'created_at'=> Carbon\Carbon::now(),
            'created_by'=> '',
            'updated_at'=> Carbon\Carbon::now(),
            'updated_by'=> '',
            'deleted_at'=> null
        ]);

        DB::table('data_fisik_pelamars')->insert([
            'data_pelamar_id'             => $data_pelamars,
            'tinggi_bdn'             => $request->data_fisik_pelamars['tinggi_bdn'],
            'berat_bdn'            => $request->data_fisik_pelamars['berat_bdn'],
            'gol_darah'                     => $request->data_fisik_pelamars['gol_darah'],
            'warna_kulit'              => $request->data_fisik_pelamars['warna_kulit'],
            'bentuk_muka'                    => $request->data_fisik_pelamars['bentuk_muka'],
            'warna_mata'           => $request->data_fisik_pelamars['warna_mata'],
            'jenis_rambut' => $request->data_fisik_pelamars['jenis_rambut'],
            'created_at'=> Carbon\Carbon::now(),
            'created_by'=> '',
            'updated_at'=> Carbon\Carbon::now(),
            'updated_by'=> '',
            'deleted_at'=> null
        ]);

        DB::table('data_pendidikan_pelamars')->insert([
            'data_pelamar_id' => $data_pelamars,
            'pendidikan_terakhir' => $request->data_pendidikan_pelamars['pendidikan_terakhir'],
            'asal_sekolah' => $request->data_pendidikan_pelamars['asal_sekolah'],
            'kota' => $request->data_pendidikan_pelamars['kota'],
            'pendidikan_satpam' => $request->data_pendidikan_pelamars['pendidikan_satpam'],
            'tempat_pendidikan' => $request->data_pendidikan_pelamars['tempat_pendidikan'],
            'sertifikat' => isset($request->data_pendidikan_pelamars['sertifikat']) ? $request->data_pendidikan_pelamars['sertifikat'] : null,
            'created_at'=> Carbon\Carbon::now(),
            'created_by'=> '',
            'updated_at'=> Carbon\Carbon::now(),
            'updated_by'=> '',
            'deleted_at'=> null
        ]);

        DB::table('data_keluarga_pelamars')->insert([
            'data_pelamar_id' => $data_pelamars,
            'nama_ayah' => $request->data_keluarga_pelamars['nama_ayah'],
            'nama_ibu' => $request->data_keluarga_pelamars['nama_ibu'],
            'alamat_ortu' => $request->data_keluarga_pelamars['alamat_ortu'],
            'no_tlp_ortu' => $request->data_keluarga_pelamars['no_tlp_ortu'],
            'saudara_terdekat' => $request->data_keluarga_pelamars['saudara_terdekat'],
            'no_tlp_saudara' => $request->data_keluarga_pelamars['no_tlp_saudara'],
            'anak_ke' => $request->data_keluarga_pelamars['anak_ke'],
            'jml_bersaudara' => $request->data_keluarga_pelamars['jml_bersaudara'],
            'created_at'=> Carbon\Carbon::now(),
            'created_by'=> '',
            'updated_at'=> Carbon\Carbon::now(),
            'updated_by'=> '',
            'deleted_at'=> null
        ]);

        DB::table('data_lain_pelamars')->insert([
            'data_pelamar_id' => $data_pelamars,
            'referensi' => $request->data_lain_pelamars['referensi'],
            'teman_global' => null,
            'nama_teman_global' => null,
            'alamat_tinggal_sekarang' => null,
            'tlp_keluarga1' => null,
            'tlp_keluarga2' => null,
            'tlp_keluarga3' => null,
            'nama_tetangga_kiri' => null,
            'alamat_tetangga_kiri' => null,
            'tlp_tetangga_kiri' => null,
            'nama_tetangga_kanan' => null,
            'alamat_tetangga_kanan' => null,
            'tlp_tetangga_kanan' => null,
            'nama_tetangga_belakang' => null,
            'alamat_tetangga_belakang' => null,
            'tlp_tetangga_belakang' => null,
            'nama_tetangga_depan' => null,
            'alamat_tetangga_depan' => null,
            'tlp_tetangga_depan' => null,
            'nama_rt' => null,
            'alamat_rt' => null,
            'tlp_rt' => null,
            'kerja_dari1' => $request->data_lain_pelamars['kerja_dari1'],
            'kerja_sampai1' => $request->data_lain_pelamars['kerja_sampai1'],
            'kerja_jabatan1' => $request->data_lain_pelamars['kerja_jabatan1'],
            'kerja_pt1' => $request->data_lain_pelamars['kerja_pt1'],
            'kerja_dari2' => $request->data_lain_pelamars['kerja_dari2'],
            'kerja_sampai2' => $request->data_lain_pelamars['kerja_sampai2'],
            'kerja_jabatan2' => $request->data_lain_pelamars['kerja_jabatan2'],
            'kerja_pt2' => $request->data_lain_pelamars['kerja_pt2'],
            'kerja_dari3' => $request->data_lain_pelamars['kerja_dari3'],
            'kerja_sampai3' => $request->data_lain_pelamars['kerja_sampai3'],
            'kerja_pt3' => $request->data_lain_pelamars['kerja_pt3'],
            'kerja_jabatan3' => $request->data_lain_pelamars['kerja_jabatan3'],
            'created_at'=> Carbon\Carbon::now(),
            'created_by'=> '',
            'updated_at'=> Carbon\Carbon::now(),
            'updated_by'=> '',
            'deleted_at'=> null

        ]);
// dd('sukses');
        return view('frontend.index')->withFlashSuccess('data berhasil disimpan');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function macros()
    {
        return view('frontend.macros');
    }
}
