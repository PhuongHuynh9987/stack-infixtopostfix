import java.sql.*;

public class JDBC {

	public static void main(String[] args) throws SQLException {
		// TODO Auto-generated method stub
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/my_app", "root", "9987");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("success");

        } catch (ClassNotFoundException e) {
            System.out.println(e);
        }
       
        Statement st = con.createStatement();
        ResultSet rs = st.executeQuery("SELECT * FROM names");
        
        rs.next();
        String name = rs.getString("name");
        int age = rs.getInt("age");
        System.out.println(name +" "+ age);
        
        
        
        con.close();
	}

}
