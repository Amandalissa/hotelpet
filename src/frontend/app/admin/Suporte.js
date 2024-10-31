import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AdminSuportePage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/suporte-solicitacoes');
      setRequests(response.data.solicitacoes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/suporte-solicitacoes/${id}/status`, { status: newStatus });
      setRequests(requests.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const sortRequests = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedRequests = [...requests].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setRequests(sortedRequests);
    setSortColumn(column);
    setSortDirection(direction);
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      {['Nome', 'Email', 'Mensagem', 'Criado em', 'Status'].map((header, index) => (
        <TouchableOpacity
          key={index}
          style={styles.headerCell}
          onPress={() => sortRequests(header.toLowerCase().replace(' ', '_'))}
        >
          <Text style={styles.headerText}>{header}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const statusColors = {
    'open': '#FFA500',
    'in progress': '#1E90FF',
    'closed': '#4CAF50',
  };

  const displayNomes = {
    'open': 'Aberto',
    'in progress': 'Em Progresso',
    'closed': 'Fechado',
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.mensagem}</Text>
      <Text style={styles.cell}>{new Date(item.criado_em).toLocaleDateString()}</Text>
      <View style={styles.cell}>
        <View style={styles.statusButtons}>
          {['open', 'in progress', 'closed'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                { backgroundColor: item.status === status ? statusColors[status] : '#5B0A80' },
              ]}
              onPress={() => updateStatus(item.id, status)}
            >
              <Text style={styles.statusButtonText}>{displayNomes[status]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3D005D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitações de Suporte </Text>
      <View style={styles.table}>
        {renderHeader()}
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D005D',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5B0A80',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#5B0A80',
  },
  cell: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  statusButton: {
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AdminSuportePage;
