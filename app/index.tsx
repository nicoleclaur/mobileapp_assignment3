import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
