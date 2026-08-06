import {
  StyleSheet,
} from "@react-pdf/renderer";

export const styles =
  StyleSheet.create({

    page: {

      padding: 30,

      fontSize: 10,

      fontFamily: "Helvetica",

      color: "#111827",

      backgroundColor: "#ffffff",

    },

    header: {

      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: 24,

      borderBottomWidth: 1,

      borderBottomColor: "#e5e7eb",

      paddingBottom: 12,

    },

    companyName: {

      fontSize: 22,

      fontWeight: "bold",

    },

    companySubtitle: {

      fontSize: 10,

      color: "#6b7280",

      marginTop: 2,

    },

    section: {

      marginBottom: 18,

    },

    sectionTitle: {

      fontSize: 12,

      fontWeight: "bold",

      marginBottom: 8,

    },

    row: {

      flexDirection: "row",

      justifyContent: "space-between",

      marginBottom: 4,

    },

    label: {

      color: "#6b7280",

    },

    value: {

      fontWeight: "bold",

    },

    table: {

      width: "100%",

      borderWidth: 1,

      borderColor: "#d1d5db",

      marginTop: 10,

    },

    tableHeader: {

      flexDirection: "row",

      backgroundColor: "#f3f4f6",

      borderBottomWidth: 1,

      borderBottomColor: "#d1d5db",

    },

    tableRow: {

      flexDirection: "row",

      borderBottomWidth: 1,

      borderBottomColor: "#e5e7eb",

    },

    cell: {

      flex: 1,

      padding: 8,

    },

    totalBox: {

      alignSelf: "flex-end",

      width: 220,

      marginTop: 18,

    },

    totalRow: {

      flexDirection: "row",

      justifyContent: "space-between",

      marginBottom: 6,

    },

    grandTotal: {

      marginTop: 10,

      borderTopWidth: 1,

      borderTopColor: "#d1d5db",

      paddingTop: 8,

      fontSize: 13,

      fontWeight: "bold",

    },

    footer: {

      position: "absolute",

      left: 30,

      right: 30,

      bottom: 20,

      borderTopWidth: 1,

      borderTopColor: "#e5e7eb",

      paddingTop: 8,

      textAlign: "center",

      color: "#6b7280",

      fontSize: 9,

    },

  });