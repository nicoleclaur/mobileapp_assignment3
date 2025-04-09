import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
  const router = useRouter();
  const { setToken } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = React.useState("");


  const handleSignIn = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      if (response.ok && data.token) {
        setSuccessMessage("Sign in successful! Redirecting...");
        setTimeout(() => {
          router.push("/employeeForm");
        }, 1500); // Short delay to let user see the message
      } else {
        setSuccessMessage(""); // Clear any previous success message
        console.log(data.msg || "Sign in failed");
      }
    } catch (error) {
      setSuccessMessage(""); // Clear if there's an error
      console.error("Error during sign in:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.headerLink}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text style={[styles.headerLink, styles.activeLink]}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInSection}>
        <Text style={styles.title}>Sign In</Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={handleSignIn}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              {successMessage ? (
                <Text style={styles.success}>{successMessage}</Text>
              ) : null}
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerLink: {
    fontSize: 16,
    color: "#007aff",
    fontWeight: "600",
  },
  activeLink: {
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 12,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  success: {
    color: "green",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
