import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Tarea = {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  status: string;
};

type Props = {
  tareas: Tarea[];
  onNuevaTarea: () => void;
};

export default function ListaTareas({ tareas, onNuevaTarea }: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Tareas</Text>

      <Text style={styles.cantidad}>Cantidad de tareas: {tareas.length}</Text>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarea}>
            <Text style={styles.nombre}>{item.title}</Text>
            <Text>Estado: {item.status}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />

      <TouchableOpacity
        style={styles.bottom}
        onPress={onNuevaTarea}
      >
        <Text style={styles.textBottom}>+ Nueva Tarea</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },

  tarea: {
    padding: 15,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },

  cantidad: {
    fontSize: 18,
    marginBottom: 10,
  },

  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottom: { 
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', //centralizar la letra
    width: 200,
    height: 60,
    alignSelf: 'center', //centralizar el boton
    marginTop: 10,
    marginBottom: 20,
  },

  textBottom: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

});
