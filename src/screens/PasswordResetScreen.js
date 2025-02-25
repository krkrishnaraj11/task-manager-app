import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { resetPasswordRequest } from "../redux/slices/auth/authApi";

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const resultAction = await dispatch(resetPasswordRequest({ email }));
      if (resetPasswordRequest.fulfilled.match(resultAction)) {
        alert("Password reset link sent to your email");
        navigation.goBack();
      } else {
        alert("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>Reset Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handlePasswordReset}
        loading={loading}
        disabled={loading}
      >
        Send Reset Link
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
  },
});

export default PasswordResetScreen;
