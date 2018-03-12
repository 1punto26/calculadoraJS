
	

	var display = 0;
	var token = 0;
	var secondToken = 0;
	var operator = "";
	var lastOperator = "";

	function pushNumber(number)
	{
		if (display == "INFINITY") return;
		
		var strDisplay = "" + Math.abs(display);
		var txtDisplay = "" + display;
		var maxNumbers = 8;
		//console.log("strDisplay = " + strDisplay + " isnumber = " + Number(strDisplay));
		
		//controla que en pantalla no haya mas de 8 digitos
		if (strDisplay.includes("."))
		{
			maxNumbers = 9;
		}
		
		if (strDisplay.length < maxNumbers)
		{
			//si es un cero y se pulsa la tecla 0 (cero), no se toma en cuenta
			if (Math.abs(display) == 0 && number == 0)
			{			
				return;
			}
			
			
			if (number == "." && txtDisplay.includes("."))
			{
				return;
			}
			
			//si en pantalla hay un cero, dado que se adicionará el numero tecleado, el cero se quita
			if (display == 0)
			{
				console.log('display = 0');
				if (number == ".") return;
				
				display = "";
			}
			display = "" + display + number;
			updateDisplay();
		}
	};


	function pushOperator(op)
	{	
		var value = 0;

		if (display == "INFINITY") return;

		//console.log ("operador recibido: " + op);
		if (Number(display) == 0 && op != "=") return;
			//console.log ("despues de op recibido");
		
		switch(op) {
			case "+":
			case "*":
			case "/":
			case "-":
				token = Number(display);
				display = 0;				
				operator = op;
				lastOperator = op;
				break;					
			case "=":
				
				if (lastOperator == "=")
				{
					//console.log("display 0 usamos secondToken " + secondToken);
					value = secondToken;
				}
				else
				{
					//console.log("modifimos secondToken de: " + secondToken);
					value = Number(display);				
					secondToken = value;
					//console.log("modifimos secondToken a: " + secondToken);
				}
			
				switch(operator){
					case "+":
						token = Number(token) + value;
						break;
					case "-":
						token = Number(token) - value;
						break;
					case "*":
						token = Number(token) * value;
						break;
					case "/":
						if (value > 0)
						{//console.log("a dividir");
							token = Number(token) / value;	
						}
						else
						{//console.log("infinitooooooooooooo");
							display = "INFINITY";
							updateDisplay();
							return;
						}
						
						break;
				}
				lastOperator = "=";
				display = token;
				break;
		}
			
		updateDisplay();
		printLog();
	};

	function toogleSign()
	{
		//console.log("+/- ");
		display = display * -1;
		//console.log(display);
		updateDisplay();
	};

	function ONC()
	{
		display = 0;
		tokey = 0;
		secondToken = 0;
		operator = "";
		lastOperator = "";
		updateDisplay();
	};

	function updateDisplay()
	{	
		//console.log(display);
		var strDisplay = "" + display;
		var nocars = 8;
		console.log("Display: " + strDisplay.substr(0,8));
		
		if (Number(display) < 0)
		{
			if (strDisplay.includes("."))
			{
				nocars = 10;
			}		
			else
			{
				9
			}
		}
		else
		{
			if (strDisplay.includes("."))
			{
				nocars = 9;
			}		
		}
		
		console.log("Display: " + Number(strDisplay.substr(0,nocars)));
		display = Number(strDisplay.substr(0,nocars));
		
		if (Number(display) > 99999999 || Number(display) < -99999999)
		{
			document.getElementById("display").innerHTML = "OVERFLOAD";	
		}
		else
		{
			document.getElementById("display").innerHTML = "" + display;	
		}		
	};

	function printLog()
	{
		//console.log("display: " + display);
		//console.log("token: " + token);
		//console.log("secondtoken: " + secondToken);
		//console.log("operator: " + operator);
	};

	function printTotal()
	{
		alert(Number(display));
	};

