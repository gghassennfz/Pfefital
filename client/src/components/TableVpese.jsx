import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TableVpese = ({ verifications, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Update currentPage when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredVerifications = verifications.filter((verif) =>
    verif.LOT.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVerifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1 className="titre1">Dossier des Lots Zone Pese :</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Chercher par Numéro de Lot"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>
      <table className="verif-table">
        <thead>
          <tr>
            <th className="header-cell">Numéro de lot :</th>
            <th className="header-cell">Date de production :</th>
            <th className="header-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((verif, index) => (
            <tr key={index} className="row">
              <td className="data-cell">{verif.LOT}</td>
              <td className="data-cell">{verif.Dateproo}</td>
              <td className="data-cell">
                <Link to={`/vpese/${verif._id}`} className="button-link">
                  <FaEye /> Consulter
                </Link>
                <button className="button-link1" onClick={() => handleDelete(verif._id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentItems.length < itemsPerPage}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TableVpese;
