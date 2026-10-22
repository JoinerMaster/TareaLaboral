import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ListaTareas from './screens/ListaTareas';
import NuevaTarea from './screens/NuevaTarea';
import DetalleTarea from './screens/DetalleTarea';

export default function App() {
  const [pantalla, setPantalla] = useState('lista');
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const guardarTarea = (tarea) => {
    setTareas((anteriores) => [...anteriores, tarea]);
    setPantalla('lista');
  };

  const marcarCompletada = () => {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === tareaSeleccionada.id
          ? { ...tarea, status: 'Completada' }
          : tarea
      )
    );

    setTareaSeleccionada((anterior) => ({
      ...anterior,
      status: 'Completada',
    }));

    setPantalla('lista');
  };

  const eliminarTarea = () => {
    setTareas((anteriores) =>
      anteriores.filter(
        (tarea) => tarea.id !== tareaSeleccionada.id
      )
    );

    setTareaSeleccionada(null);
    setPantalla('lista');
  };

  return (
    <>
      {pantalla === 'lista' ? (
        <ListaTareas
          tareas={tareas}
          onNuevaTarea={() => setPantalla('nueva')}
          onVerDetalle={(tarea) => {
            setTareaSeleccionada(tarea);
            setPantalla('detalle');
          }}
        />
      ) : pantalla === 'nueva' ? (
        <NuevaTarea
          onGuardar={guardarTarea}
          onCancelar={() => setPantalla('lista')}
        />
      ) : (
        <DetalleTarea
          tarea={tareaSeleccionada}
          onMarcarCompletada={marcarCompletada}
          onEliminar={eliminarTarea}
        />
      )}

      <StatusBar style="auto" />
    </>
  );
}



