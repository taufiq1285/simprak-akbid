import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Akses Ditolak</h1>
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
};

export default Unauthorized;
