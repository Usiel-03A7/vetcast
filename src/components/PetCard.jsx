const PetCard = ({ pet, onEdit, onDelete }) => {
  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <div className="pet-details">
        <p><span>Edad:</span> {pet.age} años</p>
        <p><span>Dueño:</span> {pet.owner}</p>
        {/* Resto de detalles */}
      </div>
      <div className="pet-actions">
        <button onClick={() => onEdit(pet)} className="btn-edit">
          Editar
        </button>
        <button onClick={() => onDelete(pet.id)} className="btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PetCard;
