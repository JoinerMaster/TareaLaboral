
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ListaTareas from './screens/ListaTareas';
import NuevaTarea from './screens/NuevaTarea';

export default function App() {
  const [pantalla, setPantalla] = useState('lista');

  const [tareas, setTareas] = useState([]);

  const guardarTarea = (tarea) => {
    setTareas((anteriores) => [...anteriores, tarea]);
    setPantalla('lista');
  };

  return (
    <>
      {pantalla === 'lista' ? (
        <ListaTareas
          tareas={tareas}
          onNuevaTarea={() => setPantalla('nueva')}
        />
      ) : (
        <NuevaTarea
          onGuardar={guardarTarea}
          onCancelar={() => setPantalla('lista')}
        />
      )}

      <StatusBar style="auto" />
    </>
  );
}


