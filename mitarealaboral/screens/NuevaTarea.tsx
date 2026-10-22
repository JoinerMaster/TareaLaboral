import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const mostrarAviso = (mensaje: string) => {
    setMensajeModal(mensaje);
    setModalVisible(true);
  };


  const guardarTarea = () => {
    if (nombre.trim() === '') {
      mostrarAviso(
        'Escribe el nombre de la tarea.'
      );
      return;
    }

    if (descripcion.trim() === '') {
      mostrarAviso(
        'Escribe la descripción de la tarea.'
      );
      return;
    }

    if (prioridad.trim() === '') {
      mostrarAviso(
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

  const coloresPrioridad: Record<string, string> = {
    Baja: '#2878D0',
    Media: '#F2C230',
    Alta: '#D93636',
  };


  return (
    
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva Tarea</Text>
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
        placeholder="Agrega una descripción..."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.subtitulo}>Prioridad</Text>

      <View style={styles.opciones}>
        {['Baja', 'Media', 'Alta'].map((opcion) => {
          const seleccionado = prioridad === opcion;
          const color = coloresPrioridad[opcion];

          return (
            <Pressable
              key={opcion}
              style={[
                styles.botonPrioridad,
                { borderColor: '#acabab' },
                seleccionado && { backgroundColor: color, borderColor: color },
              ]}
              onPress={() => setPrioridad(opcion)}
            >
              <Text
                style={[
                  styles.textoPrioridad,
                  {
                    color: '#333'
                  },
                  seleccionado && styles.textoSeleccionado,
                ]}
              >
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.botonGuardar}
        onPress={guardarTarea}
      >
        <Text style={styles.textoGuardar}>
          Guardar tarea
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonCancelar}
        onPress={onCancelar}
      >
        <Text style={styles.textoCancelar}>
          Cancelar
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>
              Campo obligatorio
            </Text>

            <Text style={styles.mensajeModal}>
              {mensajeModal}
            </Text>

            <Pressable
              style={styles.botonAceptar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoAceptar}>
                Aceptar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    marginTop: 22,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#acabab',
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
    color: '#fff'
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
    backgroundColor: '#1b1b1c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
  },

  textoCancelar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fondoModal: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

contenidoModal: {
  width: '100%',
  maxWidth: 350,
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 24,
  alignItems: 'center',
},

tituloModal: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 12,
},

mensajeModal: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 22,
},

botonAceptar: {
  backgroundColor: '#2196F3',
  paddingVertical: 11,
  paddingHorizontal: 28,
  borderRadius: 8,
},

textoAceptar: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
},
});
