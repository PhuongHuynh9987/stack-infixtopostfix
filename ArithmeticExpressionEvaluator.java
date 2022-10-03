package Assignment2;
import java.util.*;

public class ArithmeticExpressionEvaluator {
	
	public static String InfixToPostfix(String expression) {
		Stack<Character> stack = new Stack<Character>();
		String postfix = new String();
		for (int i = 0; i < expression.length(); ++i) {
			char c;
			//current character
			c = expression.charAt(i); 
			
			//if c is an operator and check the precedence
			if (precedence(c) > 0) {
				//loop stack to find any element with lower precedence
				while(!stack.isEmpty() && precedence(stack.peek()) >= precedence(c)) {
					postfix += stack.peek(); //if preced of c < any element, write c to postfix
					stack.pop();		//when pred of c > any element, stop the loop
				}
				//then push the higher operator into stack
				stack.push(c);
			}
			//if open parenthesis, add to stack
			
			else if (c == '(') {
				stack.push(c);
			}
			//if close parenthesis, pop the stack and add into postfix until found the open one
			else if(c ==')') {
				while(!stack.isEmpty() && stack.peek()!= '('){
						postfix += stack.peek();
						stack.pop();
				}
				stack.pop();
			}
			//if c is an operand, write to the output postfix
			else
				postfix +=c;
		}
		//write the rest to the output
		while (!stack.isEmpty()) {
			postfix += stack.peek();
			stack.pop();
		}
		
		return postfix;
	}
	
	public static int precedence(char c) {
		if (c == '+' || c == '-'){
			return 1;
		}
		if (c == '*' || c == '/'){
			return 2;
		}
		if (c == '^'){
			return 3;
		}
		return -1;
	}
	
	
	public static int EvaluatePostfix(String input){
		Stack<Integer> result = new Stack<>();
		int x;
		int y;
		for (int i = 0; i < input.length(); i++) {
			char c = input.charAt(i);
			if(Character.isDigit(c)) {
				result.push(c-'0');
			}
			else {
				x = result.pop();
				y = result.pop();
				if(c == '+') 
					result.push(y+x);
				if(c == '-') 
					result.push(y-x);
				if(c == '*') 
					result.push(y*x);
				if(c == '/') 
					result.push(y/x);
				else if (c == '^') {
					double calc = Math.pow(y, x);
					int value = (int) calc;
					result.push(value);
				}
			}	
		}	
		return result.pop();
	}

	public static void main(String[] args) {
		// crate a list of integer
		String exp = new String ("(1+4)*2^3-8/(1-9)");
		System.out.println("Infix:   " + exp);
		System.out.println("Postfix: " + InfixToPostfix(exp));
		System.out.println("Result:  " + EvaluatePostfix(InfixToPostfix(exp)));
	}

}
