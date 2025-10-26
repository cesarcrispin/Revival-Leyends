import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 40,
  },

  sectionTitle: {
    fontSize: 24,
    color: "#d4af37",
    marginBottom: 15,
    textAlign: "center",
  },

  verticalCard: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#d4af37",
    overflow: "hidden",
    backgroundColor: "rgba(30,30,30,0.9)",
  },

  verticalCardImage: {
    width: "100%",
    height: 200,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(20,20,20,0.8)",
  },

  verticalCardTitle: {
    fontSize: 18,
    color: "#fff",
  },

  headerTiny: {
    height: 45,
    backgroundColor: "rgba(26,26,26,0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    marginLeft: -25,
    top: -5,
  },

  logoImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  searchButton: {
    position: "absolute",
    right: 15,
    top: 10,
  },
});