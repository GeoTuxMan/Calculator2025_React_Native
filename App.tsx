import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [currentInput, setCurrentInput] = useState('0');
  const [operationString, setOperationString] = useState('');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [storedOperator, setStoredOperator] = useState('');

  const handleNumberPress = (num: string) => {
    if (currentInput === '0') {
      setCurrentInput(num);
    } else {
      setCurrentInput(currentInput + num);
    }
  };

  const handleOperatorPress = (op: string) => {
    if (storedValue !== null && storedOperator) {
      const result = calculate(storedValue, parseFloat(currentInput), storedOperator);
      setStoredValue(result);
      setOperationString(`${operationString} ${currentInput} ${op}`);
    } else {
      setStoredValue(parseFloat(currentInput));
      setOperationString(`${currentInput} ${op}`);
    }
    setStoredOperator(op);
    setCurrentInput('0');
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (storedValue !== null && storedOperator) {
      const result = calculate(storedValue, parseFloat(currentInput), storedOperator);
      setOperationString(`${operationString} ${currentInput} = ${result}`);
      setCurrentInput(result.toString());
      setStoredValue(null);
      setStoredOperator('');
    }
  };

  const clearAll = () => {
    setCurrentInput('0');
    setOperationString('');
    setStoredValue(null);
    setStoredOperator('');
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.operationText}>{operationString}</Text>
        <Text style={styles.displayText}>{currentInput}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  button === '=' && styles.equalsButton,
                  button === 'C' && styles.clearButton,
                  ['+', '-', '*', '/'].includes(button) && styles.operatorButton,
                ]}
                onPress={() => {
                  if (button === 'C') {
                    clearAll();
                  } else if (button === '=') {
                    handleEquals();
                  } else if (['+', '-', '*', '/'].includes(button)) {
                    handleOperatorPress(button);
                  } else {
                    handleNumberPress(button);
                  }
                }}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2D', // Fundal albastru închis
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#2D2D3D', // Albastru medium pentru display
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A4A',
  },
  operationText: {
    fontSize: 24,
    color: '#A0A0C0', // Albastru deschis pentru text secundar
    marginBottom: 10,
    textAlign: 'right',
    width: '100%',
  },
  displayText: {
    fontSize: 48,
    color: '#FFFFFF', // Alb pur pentru text principal
    textAlign: 'right',
    width: '100%',
    fontWeight: '300',
  },
  buttonsContainer: {
    flex: 3,
    padding: 15,
    backgroundColor: '#1E1E2D',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 15,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D4D', // Albastru pentru butoane normale
    borderRadius: 35,
    elevation: 3,
  },
  buttonText: {
    fontSize: 26,
    color: '#E0E0FF', // Alb cu nuanță albastră
    fontWeight: '500',
  },
  equalsButton: {
    backgroundColor: '#3D7DEB', // Albastru vibrant pentru =
  },
  clearButton: {
    backgroundColor: '#EB3D5B', // Roșu pentru C
  },
  operatorButton: {
    backgroundColor: '#4D4D7D', // Albastru diferit pentru operatori
  },
});