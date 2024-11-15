let objectData = {};
let requiredValues = 0;
let valuesEntered = 0;

document.getElementById("key-count").addEventListener("input", (e) => {
    const value = parseInt(e.target.value);

    if (isNaN(value) || value <= 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please enter a positive number for the keys count!",
        });
        return;
    }

    requiredValues = value;
    valuesEntered = 0;
    objectData = {};
    document.getElementById("object-display").innerHTML = "";
    document.getElementById("status-message").textContent = `${requiredValues} values needed.`;
});

function addValue() {
    const inputValue = document.getElementById("user-input").value.trim();

    if (inputValue) {
        if (valuesEntered < requiredValues) {
            valuesEntered++;
            objectData[`key${valuesEntered}`] = inputValue;
            document.getElementById("object-display").innerHTML = `<pre>${JSON.stringify(objectData, null, 2)}</pre>`;

            if (valuesEntered < requiredValues) {
                document.getElementById("status-message").textContent = `${requiredValues - valuesEntered} more value(s) left.`;
            } else {
                document.getElementById("status-message").textContent = "All values entered!";
            }
            document.getElementById("user-input").value = "";
        } else {
            Swal.fire({
                icon: "error",
                title: "Value Limit Exceeded",
                text: `You can only enter ${requiredValues} value(s).`,
            });
        }
    }
}

function callMethod(method) {
    if (valuesEntered < requiredValues) {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Entry",
            text: `Please enter all ${requiredValues} values first!`,
        });
    } else {
        let result;
        switch (method) {
            case "keys":
                result = Object.keys(objectData);
                break;
            case "entries":
                result = Object.entries(objectData);
                break;
            case "values":
                result = Object.values(objectData);
                break;
            case "assign":
                const anotherObject = { key4: "value4" };
                result = Object.assign({}, objectData, anotherObject);
                break;
            case "create":
                const prototypeObj = { greet: function() { return "Hello!"; } };
                result = Object.create(prototypeObj);
                break;
            case "fromEntries":
                const entries = [["key1", "value1"], ["key2", "value2"]];
                result = Object.fromEntries(entries);
                break;
            case "groupBy":
                result = groupBy(objectData, (key, value) => value[0]);
                break;
            default:
                result = "Invalid method";
        }
        document.getElementById("method-result").textContent = JSON.stringify(result, null, 2);
    }
}

function groupBy(obj, func) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const groupKey = func(key, value);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push([key, value]);
        return acc;
    }, {});
}

function resetProject() {
    objectData = {};
    valuesEntered = 0;
    requiredValues = 0;
    
    document.getElementById("key-count").value = "";
    document.getElementById("user-input").value = "";
    document.getElementById("object-display").innerHTML = "";
    document.getElementById("status-message").textContent = "";
    document.getElementById("method-result").textContent = "";
}