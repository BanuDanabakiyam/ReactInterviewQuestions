(async function() {
    const data = await fetch('./src/data.json');
    const res = await data.json();
    //console.log(res);

    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employees__names--list");
    console.log(employeeList);
    const employeeInfo = document.querySelector(".employees__single--info");
    console.log(employeeInfo);

    // Add employee Logic

    // select employee Logic

    employeeList.addEventListener('click',(e) => {
       if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id){
        selectedEmployeeId = e.target.id;
        renderEmployees();
        renderSingleEmployee();
       } 
    });

    const renderEmployees = () => {
        console.log("inside");
        employeeList.innerHTML = "";
        employees.forEach((emp) => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item");

            if(parseInt(selectedEmployeeId, 10) === emp.id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }

            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName}`

            employeeList.append(employee);
        });
    };
    const renderSingleEmployee = () => {

    employeeInfo.innerHTML = 
    `<img src="${selectedEmployee.imageUrl}"/>
    <span class="employees__single--heading>
    ${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}
    </span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob} </span>
    `;};
     if (selectedEmployee) renderSingleEmployee();
     renderEmployees();
})();
