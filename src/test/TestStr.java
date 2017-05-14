package test;

public class TestStr {

	public static void main(String[] args) {

		String str = "东区、北区、香山区";

		String[] strs = str.split("、");
		for (String s : strs) {
			String ss = "";
			ss = "'" + s + "'";
			ss = ss + ",";
			System.err.print(ss);
		}
	}

}
