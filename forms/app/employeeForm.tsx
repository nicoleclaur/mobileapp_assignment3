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

const employeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Phone number must be at least 10")
    .required("Phone Number is required"),
  department: Yup.string()
    .oneOf(
      ["Technology", "Business", "Marketing", "Sales", "HR"],
      "Invalid department. Hint: Technology, Business, Marketing, Sales, HR"
    )
    .required("Department is required"),
  dateOfBirth: Yup.string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of Birth must be in YYYY-MM-DD format"
    )
    .required("Date of Birth is required"),
});

const employeeForm = () => {
  const router = useRouter();
  const logout = () => {
    router.push("/signin");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text style={styles.headerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Employee Form</Text>
      </View>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          department: "",
          dateOfBirth: "",
        }}
        validationSchema={employeeSchema}
        onSubmit={(handleSubmit) => {
          console.log(handleSubmit);
          router.push("/employeeForm");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />

            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />

            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

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
              placeholder="Phone Number"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
            />

            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Department"
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
              value={values.department}
            />

            {errors.department && (
              <Text style={styles.error}>{errors.department}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              onChangeText={handleChange("dateOfBirth")}
              onBlur={handleBlur("dateOfBirth")}
              value={values.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <Text style={styles.error}>{errors.dateOfBirth}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default employeeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 12,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    zIndex: 1,
  },
  headerLink: {
    fontSize: 16,
    color: "#007aff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
