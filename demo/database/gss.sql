-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2018 at 08:34 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gss`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_fisik_pelamars`
--

CREATE TABLE `data_fisik_pelamars` (
  `id` int(11) NOT NULL,
  `data_pelamar_id` int(11) DEFAULT NULL,
  `tinggi_bdn` varchar(10) DEFAULT NULL,
  `berat_bdn` varchar(10) DEFAULT NULL,
  `gol_darah` varchar(5) DEFAULT NULL,
  `warna_kulit` varchar(20) DEFAULT NULL,
  `bentuk_muka` varchar(20) DEFAULT NULL,
  `warna_mata` varchar(20) DEFAULT NULL,
  `jenis_rambut` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_fisik_pelamars`
--

INSERT INTO `data_fisik_pelamars` (`id`, `data_pelamar_id`, `tinggi_bdn`, `berat_bdn`, `gol_darah`, `warna_kulit`, `bentuk_muka`, `warna_mata`, `jenis_rambut`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`) VALUES
(5, 5, 'tatat', '12', 'B', 'Hitam', 'Lonjong', 'lain kali', 'lainnya lagi', '2018-09-25 11:28:21', '', '2018-09-25 11:28:21', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_keluarga_pelamars`
--

CREATE TABLE `data_keluarga_pelamars` (
  `id` int(11) NOT NULL,
  `data_pelamar_id` int(11) DEFAULT NULL,
  `nama_ayah` varchar(50) DEFAULT NULL,
  `nama_ibu` varchar(50) DEFAULT NULL,
  `alamat_ortu` varchar(50) DEFAULT NULL,
  `no_tlp_ortu` varchar(50) DEFAULT NULL,
  `saudara_terdekat` varchar(50) DEFAULT NULL,
  `no_tlp_saudara` varchar(50) DEFAULT NULL,
  `anak_ke` varchar(50) DEFAULT NULL,
  `jml_bersaudara` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_keluarga_pelamars`
--

INSERT INTO `data_keluarga_pelamars` (`id`, `data_pelamar_id`, `nama_ayah`, `nama_ibu`, `alamat_ortu`, `no_tlp_ortu`, `saudara_terdekat`, `no_tlp_saudara`, `anak_ke`, `jml_bersaudara`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`) VALUES
(1, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-25 11:16:59', '', '2018-09-25 11:16:59', '', NULL),
(2, 5, 'maruan', 'idhsihiodsoih', 'oihoihiohio', 'hiohiohiohi', 'ohiohiohio', 'hihoih', '12', '12', '2018-09-25 11:28:21', '', '2018-09-25 11:28:21', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_lain_pelamars`
--

CREATE TABLE `data_lain_pelamars` (
  `id` int(11) NOT NULL,
  `data_pelamar_id` int(11) DEFAULT NULL,
  `referensi` varchar(50) DEFAULT NULL,
  `teman_global` int(2) DEFAULT NULL,
  `nama_teman_global` varchar(50) DEFAULT NULL,
  `alamat_tinggal_sekarang` varchar(100) DEFAULT NULL,
  `tlp_keluarga1` varchar(20) DEFAULT NULL,
  `tlp_keluarga2` varchar(20) DEFAULT NULL,
  `tlp_keluarga3` varchar(20) DEFAULT NULL,
  `nama_tetangga_kiri` varchar(50) DEFAULT NULL,
  `alamat_tetangga_kiri` varchar(100) DEFAULT NULL,
  `tlp_tetangga_kiri` varchar(50) DEFAULT NULL,
  `nama_tetangga_kanan` varchar(50) DEFAULT NULL,
  `alamat_tetangga_kanan` varchar(100) DEFAULT NULL,
  `tlp_tetangga_kanan` varchar(50) DEFAULT NULL,
  `nama_tetangga_belakang` varchar(50) DEFAULT NULL,
  `alamat_tetangga_belakang` varchar(100) DEFAULT NULL,
  `tlp_tetangga_belakang` varchar(50) DEFAULT NULL,
  `nama_tetangga_depan` varchar(50) DEFAULT NULL,
  `alamat_tetangga_depan` varchar(100) DEFAULT NULL,
  `tlp_tetangga_depan` varchar(50) DEFAULT NULL,
  `nama_rt` varchar(50) DEFAULT NULL,
  `alamat_rt` varchar(100) DEFAULT NULL,
  `tlp_rt` varchar(50) DEFAULT NULL,
  `kerja_dari1` date DEFAULT NULL,
  `kerja_sampai1` date DEFAULT NULL,
  `kerja_jabatan1` varchar(50) DEFAULT NULL,
  `kerja_pt1` varchar(50) DEFAULT NULL,
  `kerja_dari2` date DEFAULT NULL,
  `kerja_sampai2` date DEFAULT NULL,
  `kerja_jabatan2` varchar(50) DEFAULT NULL,
  `kerja_pt2` varchar(50) DEFAULT NULL,
  `kerja_dari3` date DEFAULT NULL,
  `kerja_sampai3` date DEFAULT NULL,
  `kerja_pt3` varchar(50) DEFAULT NULL,
  `kerja_jabatan3` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_lain_pelamars`
--

INSERT INTO `data_lain_pelamars` (`id`, `data_pelamar_id`, `referensi`, `teman_global`, `nama_teman_global`, `alamat_tinggal_sekarang`, `tlp_keluarga1`, `tlp_keluarga2`, `tlp_keluarga3`, `nama_tetangga_kiri`, `alamat_tetangga_kiri`, `tlp_tetangga_kiri`, `nama_tetangga_kanan`, `alamat_tetangga_kanan`, `tlp_tetangga_kanan`, `nama_tetangga_belakang`, `alamat_tetangga_belakang`, `tlp_tetangga_belakang`, `nama_tetangga_depan`, `alamat_tetangga_depan`, `tlp_tetangga_depan`, `nama_rt`, `alamat_rt`, `tlp_rt`, `kerja_dari1`, `kerja_sampai1`, `kerja_jabatan1`, `kerja_pt1`, `kerja_dari2`, `kerja_sampai2`, `kerja_jabatan2`, `kerja_pt2`, `kerja_dari3`, `kerja_sampai3`, `kerja_pt3`, `kerja_jabatan3`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`) VALUES
(1, 5, 'aziz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-01', '2018-09-26', 'anuan', 'anu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-25 11:28:21', '', '2018-09-25 11:28:21', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_pelamars`
--

CREATE TABLE `data_pelamars` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` datetime DEFAULT NULL,
  `umur` int(5) DEFAULT NULL,
  `jns_kelamin` varchar(50) DEFAULT NULL,
  `agama` varchar(50) DEFAULT NULL,
  `alamat_tinggal` varchar(100) DEFAULT NULL,
  `alamat_tinggal_kecamatan` varchar(50) DEFAULT NULL,
  `alamat_tinggal_kota` varchar(50) DEFAULT NULL,
  `status_tempat_tinggal` varchar(50) DEFAULT NULL,
  `no_tlp` varchar(50) DEFAULT NULL,
  `type_id` varchar(50) DEFAULT NULL,
  `no_id` varchar(50) DEFAULT NULL,
  `no_id_berkalu` datetime DEFAULT NULL,
  `status_nikah` varchar(50) DEFAULT NULL,
  `nama_pasangan` varchar(50) DEFAULT NULL,
  `tgl_lahir_pasangan` datetime DEFAULT NULL,
  `nama_anak1` varchar(50) DEFAULT NULL,
  `tgl_lahir_anak1` datetime DEFAULT NULL,
  `nama_anak2` varchar(50) DEFAULT NULL,
  `tgl_lahir_anak2` datetime DEFAULT NULL,
  `nama_anak3` varchar(50) DEFAULT NULL,
  `tgl_lahir_anak3` datetime DEFAULT NULL,
  `nama_anak4` varchar(50) DEFAULT NULL,
  `tgl_lahir_anak4` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_pelamars`
--

INSERT INTO `data_pelamars` (`id`, `nama_lengkap`, `tempat_lahir`, `tanggal_lahir`, `umur`, `jns_kelamin`, `agama`, `alamat_tinggal`, `alamat_tinggal_kecamatan`, `alamat_tinggal_kota`, `status_tempat_tinggal`, `no_tlp`, `type_id`, `no_id`, `no_id_berkalu`, `status_nikah`, `nama_pasangan`, `tgl_lahir_pasangan`, `nama_anak1`, `tgl_lahir_anak1`, `nama_anak2`, `tgl_lahir_anak2`, `nama_anak3`, `tgl_lahir_anak3`, `nama_anak4`, `tgl_lahir_anak4`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`) VALUES
(5, 'aziz', 'tangserang', '2018-09-01 00:00:00', 12, 'Wanita', 'Katolik', 'jdsugdsg', 'ciputat', 'tangesr', 'Keluarga', 'hdios', '', 'hiohiofsss', NULL, 'Belum Menikah', 'sumijem', '2018-09-26 00:00:00', 'augusdgsdiu', '2018-09-26 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-25 11:28:21', '', '2018-09-25 11:28:21', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_pendidikan_pelamars`
--

CREATE TABLE `data_pendidikan_pelamars` (
  `id` int(11) NOT NULL,
  `data_pelamar_id` int(11) DEFAULT NULL,
  `pendidikan_terakhir` varchar(20) DEFAULT NULL,
  `asal_sekolah` varchar(100) DEFAULT NULL,
  `kota` varchar(50) DEFAULT NULL,
  `pendidikan_satpam` varchar(100) DEFAULT NULL,
  `tempat_pendidikan` varchar(100) DEFAULT NULL,
  `sertifikat` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_pendidikan_pelamars`
--

INSERT INTO `data_pendidikan_pelamars` (`id`, `data_pelamar_id`, `pendidikan_terakhir`, `asal_sekolah`, `kota`, `pendidikan_satpam`, `tempat_pendidikan`, `sertifikat`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`) VALUES
(4, 5, 'SMA', 'jakarta', 'tangsel', 'Pra - Dasar', 'sonoh', '1', '2018-09-25 11:28:21', '', '2018-09-25 11:28:21', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(10) UNSIGNED NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assets` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_types`
--

CREATE TABLE `history_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `history_types`
--

INSERT INTO `history_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'User', '2018-09-20 21:16:42', '2018-09-20 21:16:42'),
(2, 'Role', '2018-09-20 21:16:42', '2018-09-20 21:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2015_12_28_171741_create_social_logins_table', 1),
(4, '2015_12_29_015055_setup_access_tables', 1),
(5, '2016_07_03_062439_create_history_tables', 1),
(6, '2017_04_04_131153_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'view-backend', 'View Backend', '2018-09-20 21:16:42', '2018-09-20 21:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`id`, `permission_id`, `role_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `all` tinyint(1) NOT NULL DEFAULT '0',
  `sort` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `all`, `sort`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 1, 1, '2018-09-20 21:16:42', '2018-09-20 21:16:42'),
(2, 'Executive', 0, 2, '2018-09-20 21:16:42', '2018-09-20 21:16:42'),
(3, 'User', 0, 3, '2018-09-20 21:16:42', '2018-09-20 21:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('NdBOOqvQSMuKAK2FTju859O9sTpafBL864qRKK3J', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', 'ZXlKcGRpSTZJalZzUjFaeFNHbHNOSGhWYjBWc2EzWmpjMjlWZWtFOVBTSXNJblpoYkhWbElqb2lNMnRrUmtSV2NGVjRUMlpOUmxSVWIyOURkbnA1YlVOVGFrRlBaekpCYm1ZelpWTm5SVVpNY2xWcFhDODNXVEV5ZUZwMldVTk1lWGhQWnl0WlNYY3hObGhyUzNoaGFVTkdNeXRaWm1wMWNtOXJNVzlhVEZCbUsxaHhUbk5LWld4amFXNTZabUUyV0VoamJWTktURE5qT0VGdlpHSktOVWh6YjJ0aFRsUktaek0wZHpFcloxd3ZaMk5rUlZKUk1sTnFabHd2WkVkTEsxRjRTbHd2Tlc5UmNrd3lWME0wUjBoR2VuUlNhMFJ3VVhBNFIyZGxja3h3ZUdObllXOXFiMnRpVjJzNE1Wa3pRbTlVUjBsSksyOVNWVkU1TTJadGFWWlpZM0ZsTTJ0U2NFSmhkVzkzYzBSS1ZIVktlbWRNZVVGWlJuQjBlRzFoY1d0YWFIaEJkM1ZYTWt4cWQyWm5aeXRQUkRNeWFsbEpVVkUzWTNKamVVZEdNMDVhVjBWek9HSjFUbG94TjBKWVkwRm9WekpOYW1Rek1WbEllRFZIV1dWd1oyTnJNR2hqWlZKeVpUQm9JaXdpYldGaklqb2lPV0ZtWXpjME5qUXlOVGc0WlRsaFl6Qm1ObVF5TkdZM1pqQTFNemM0TURWak16QTJaRGd4TmpkbU16UXdNV1pqTVdNMU1HRXhPVGt3WkRCaFptWmtOeUo5', 1537900101);

-- --------------------------------------------------------

--
-- Table structure for table `social_logins`
--

CREATE TABLE `social_logins` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `provider` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `confirmation_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `status`, `confirmation_code`, `confirmed`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'Istrator', 'admin@admin.com', '$2y$10$yw9Z.bO5mza0yUkrb.R7JOja.zEVIjRaEaWkxDjkt5wCiM0HtgNP6', 1, '125f382d485b9a5327971adb6a04b2ba', 1, 'H6YObnPy7MPwB2vAuMZfDcc04ZkUNcwyWm8s9TZfm2SmRDxfxj7vFM6mvNDa', '2018-09-20 21:16:41', '2018-09-20 21:16:41', NULL),
(2, 'Backend', 'User', 'executive@executive.com', '$2y$10$ilF8aopLwTlPeh1abEenbugrdydzptdTWMo47NKnqTNc4EH/Q38ZS', 1, '17416a55bb0dc2c0e7060ffb3e966060', 1, NULL, '2018-09-20 21:16:41', '2018-09-20 21:16:41', NULL),
(3, 'Default', 'User', 'user@user.com', '$2y$10$p18EcZIj0VlU9l75aCQR5.ajEJ.bUtDswVjA1QnBwNkuftXmMi87O', 1, 'b0a904be17324087120dfd76c5c54238', 1, NULL, '2018-09-20 21:16:42', '2018-09-20 21:16:42', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_fisik_pelamars`
--
ALTER TABLE `data_fisik_pelamars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_keluarga_pelamars`
--
ALTER TABLE `data_keluarga_pelamars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_lain_pelamars`
--
ALTER TABLE `data_lain_pelamars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pelamars`
--
ALTER TABLE `data_pelamars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pendidikan_pelamars`
--
ALTER TABLE `data_pendidikan_pelamars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_type_id_foreign` (`type_id`),
  ADD KEY `history_user_id_foreign` (`user_id`);

--
-- Indexes for table `history_types`
--
ALTER TABLE `history_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_role_permission_id_foreign` (`permission_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_user_id_foreign` (`user_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `sessions_id_unique` (`id`);

--
-- Indexes for table `social_logins`
--
ALTER TABLE `social_logins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `social_logins_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_fisik_pelamars`
--
ALTER TABLE `data_fisik_pelamars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `data_keluarga_pelamars`
--
ALTER TABLE `data_keluarga_pelamars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_lain_pelamars`
--
ALTER TABLE `data_lain_pelamars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_pelamars`
--
ALTER TABLE `data_pelamars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `data_pendidikan_pelamars`
--
ALTER TABLE `data_pendidikan_pelamars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history_types`
--
ALTER TABLE `history_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `social_logins`
--
ALTER TABLE `social_logins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `history_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `history_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_logins`
--
ALTER TABLE `social_logins`
  ADD CONSTRAINT `social_logins_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
