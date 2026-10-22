import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

type Tarea = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

type Props = {
  tarea: Tarea;
  onMarcarCompletada: () => void;
  onEliminar: () => void;
};

export default function DetalleTarea({ tarea, onMarcarCompletada, onEliminar,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Detalle</Text>

      <Text style={styles.tituloTarea}>
        {tarea.title}
      </Text>

      <Text style={styles.descripcion}>
        {tarea.description}
      </Text>

      <Text style={styles.etiqueta}>Estado</Text>

      <View style={styles.estado}>
        <Text style={styles.textoEstado}>
          {tarea.status}
        </Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          style={[
            styles.botonCompletar,
            tarea.status === 'Completada' &&
            styles.botonDeshabilitado,
          ]}
          onPress={onMarcarCompletada}
          disabled={tarea.status === 'Completada'}
        >
          <Text style={styles.textoBoton}>
            {tarea.status === 'Completada'
              ? 'Tarea completada'
              : 'Marcar completada'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBoton}>
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>
              Eliminar tarea
            </Text>

            <Text style={styles.textoModal}>
              ¿Estás seguro de que deseas eliminar
              esta tarea?
            </Text>

            <View style={styles.opcionesModal}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botonConfirmar}
                onPress={onEliminar}
              >
                <Text style={styles.textoBoton}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },

  tituloPrincipal: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 18,
  },

  tituloTarea: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 14,
  },

  descripcion: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 34,
  },

  etiqueta: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },

  estado: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignSelf: 'flex-start',
    minWidth: 170,
  },

  textoEstado: {
    fontSize: 16,
    color: '#166534',
  },

  botones: {
    marginTop: 55,
    gap: 20,
  },

  botonCompletar: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  botonDeshabilitado: {
    opacity: 0.65,
  },

  botonEliminar: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  contenidoModal: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
  },

  tituloModal: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },

  textoModal: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },

  opcionesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },

  botonCancelar: {
    backgroundColor: '#1b1b1c',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },

  textoCancelar: {
    color: '#eaedf2',
    fontWeight: 'bold',
    fontSize: 17,
  },
  
  botonConfirmar: {
    backgroundColor: '#e82c2c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
