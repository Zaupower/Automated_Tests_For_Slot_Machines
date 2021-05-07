StartUp();

	//Helper Functions
    //Wrap in function to sign machines to work
	function StartUp()
	{
	 getMachines()[1].Config.Load();
	 g_machineState = "off";
	 RandomReboot();
	 getMachines()[1].DoInput('p',1);
	}

    function RandomReboot()
	{
		getMachines()[1].setTimeout('doReboot',random()*1000000+10000,'DoReboot();')
	}