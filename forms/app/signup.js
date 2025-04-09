import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too short!")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Too short!")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must include a lowercase letter")
      .matches(/[0-9]/, "Must include a number")
      .required("Password is required"),
  });

  const handleSignUp = async (values) => {
    setLoading(true);
    setServerError("");
    setSuccessMessage(""); // Clear any previous success message
  
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      if (response.ok && data.token) {
        setSuccessMessage("Signup successful! Redirecting to Sign In...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        setServerError(data.msg || "Signup failed. Please try again.");
      }
    } catch (error) {
      setServerError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
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

      {/* Sign-Up Form Section */}
      <View style={styles.signUpSection}>
        <Text style={styles.title}>Create Account</Text>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.error}>{errors.firstName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.error}>{errors.lastName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {serverError ? (
                <Text style={styles.error}>{serverError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 200,
    paddingHorizontal: 20,
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
  signUpSection: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});

export default SignUp;
