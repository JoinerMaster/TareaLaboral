import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Tarea = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

type Props = {
  onGuardar: (tarea: Tarea) => void;
  onCancelar: () => void;
};

export default function NuevaTarea({ onGuardar, onCancelar }: Props) {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('');

  
const guardarTarea = () => {
  if (nombre.trim() === '') {
    Alert.alert(
      'Campo obligatorio',
      'Escribe el nombre de la tarea.'
    );
    return;
  }

  if (descripcion.trim() === '') {
    Alert.alert(
      'Campo obligatorio',
      'Escribe la descripción de la tarea.'
    );
    return;
  }

  if (prioridad.trim() === '') {
    Alert.alert(
      'Campo obligatorio',
      'Seleccione el tipo de prioridad.'
    );
    return;
  }

  onGuardar({
    id: Date.now().toString(),
    title: nombre.trim(),
    description: descripcion.trim(),
    priority: prioridad,
    status: 'Pendiente',
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva tarea</Text>

      <Text style={styles.etiqueta}>
        Nombre de la tarea
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Compras viveres"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.subtitulo}>Descripción</Text>

      <TextInput
        style={[styles.input, styles.areaTexto]}
        placeholder="Escribe una descripción..."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.subtitulo}>Prioridad</Text>

      <View style={styles.opciones}>
        {['Baja', 'Media', 'Alta'].map((opcion) => (
          <Pressable
            key={opcion}
            style={[
              styles.botonPrioridad,
              prioridad === opcion &&
                styles.prioridadSeleccionada,
            ]}
            onPress={() => setPrioridad(opcion)}
          >
            <Text
              style={[
                styles.textoPrioridad,
                prioridad === opcion &&
                  styles.textoSeleccionado,
              ]}
            >
              {opcion}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.botonGuardar}
        onPress={guardarTarea}
      >
        <Text style={styles.textoGuardar}>
          Guardar tarea
        </Text>
      </Pressable>

      <Pressable
        style={styles.botonCancelar}
        onPress={onCancelar}
      >
        <Text style={styles.textoCancelar}>
          Cancelar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 28,
  },

  etiqueta: {
    fontSize: 18,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  areaTexto: {
    height: 110,
  },

  opciones: {
    flexDirection: 'row',
    gap: 10,
  },

  botonPrioridad: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },

  prioridadSeleccionada: {
    backgroundColor: '#DCEAFE',
    borderColor: '#2196F3',
  },

  textoPrioridad: {
    fontSize: 16,
  },

  textoSeleccionado: {
    color: '#174EA6',
    fontWeight: 'bold',
  },

  botonGuardar: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  textoGuardar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botonCancelar: {
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  
  textoCancelar: {
    color: '#555',
    fontSize: 16,
  },
});
