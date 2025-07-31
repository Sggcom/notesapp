const Record = ({ student }) => {
    return (
        <div className={`shadow-lg rounded-xl p-4 w-64 text-left border hover:scale-105 transition ${student.bgColor}`}>
            <h2 className="text-xl font-semibold text-blue-700">{student.name}</h2>
            <p className="text-gray-600"><strong>Roll No:</strong> {student.roll}</p>
            <p className="text-gray-600"><strong>Class:</strong> {student.className}</p>
        </div>
    );
}

export default Record;

