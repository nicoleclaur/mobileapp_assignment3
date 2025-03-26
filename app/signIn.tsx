import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import { useRouter } from "expo-router";
  
  const signInSchema = Yup.object().shape({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().min(6, "Too short").required("Password is required"),
  })

  export default function signIn() {
      const router = useRouter();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <Formik
        initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            console.log(values);
            router.push("/employeeForm");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                  <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  />
                  {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                  <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  />
                  {errors.password && <Text style={styles.error}>{errors.password}</Text>}
  
                  <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                      <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
              </View>
          )}
  
        </Formik>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
      },
      title: {
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
      },
      input: {
          width: 280,
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 5,
          backgroundColor: "#FFFFFF",
      },
      error: {
          color: "red",
          fontSize: 12,
      },
      button: {
          backgroundColor: "#007aff",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginVertical: 10,
          width: 280,
          alignItems: "center",
      },
      buttonText: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
      },
      googleButton: {
          backgroundColor: "#db4437",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginVertical: 10,
          width: 280,
          alignItems: "center",
      },
  });