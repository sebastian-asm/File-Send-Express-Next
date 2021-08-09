export default function Alerta({ mensaje }) {
  return (
    <div className="bg-red-400 p-3 w-full my-3 max-w-lg text-center text-white mx-auto">
      {mensaje}
    </div>
  );
}
