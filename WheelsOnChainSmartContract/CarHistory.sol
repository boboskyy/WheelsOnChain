// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarHistory {
    struct Car {
        string make;
        string model;
        string version;
        uint256 year;
        uint256 engineCapacity;
        string countryOfOrigin;
        string fuelType;
        bytes32 vinHash;
        bool stolen;
        mapping(uint256 => Modification) modifications;
        uint256 modificationCount;
        mapping(uint256 => Inspection) inspections;
        uint256 inspectionCount;
    }

    struct MinimalCar {
        string make;
        string model;
        string version;
        uint256 year;
        address carAddress;
    }

    struct Modification {
        uint256 modId;
        string modificationDetails;
        string modifierName;
        address modifierAddress;
        uint256 modificationTimestamp;
        uint256 costInUsd;
    }

    struct Inspection {
        uint256 inspectionId;
        string inspectionDetails;
        string inspectorName;
        address inspectorAddress;
        uint256 inspectionTimestamp;
        uint256 mileage;
    }

    mapping(address => Car) private cars;
    address[] private addressList;

    // Events to track actions on the blockchain
    event CarAdded(address indexed carOwner, bytes32 vinHash);
    event ModificationAdded(address indexed carOwner, uint256 modId);
    event InspectionAdded(address indexed carOwner, uint256 inspectionId);
    event CarStolenStatusUpdated(address indexed carOwner, bool stolen);

    // Modifier for access control
    modifier onlyOwner(address _carAddress) {
        require(_carAddress == msg.sender, "Only the owner can perform this action");
        _;
    }

    // Function to add a car, with validations
    function addCar(
        string memory _make,
        string memory _model,
        string memory _version,
        uint256 _year,
        uint256 _engineCapacity,
        string memory _countryOfOrigin,
        string memory _fuelType,
        string memory _vin
    ) public {
        Car storage newCar = cars[msg.sender];

        require(bytes(newCar.make).length == 0, "You already own a car.");
        require(bytes(_make).length > 0, "Make is required.");
        require(bytes(_model).length > 0, "Model is required.");
        require(bytes(_version).length > 0, "Version is required.");
        require(_year > 0, "Year is required and must be greater than 0.");
        require(_engineCapacity > 0, "Engine capacity is required and must be greater than 0.");
        require(bytes(_countryOfOrigin).length > 0, "Country of origin is required.");
        require(bytes(_fuelType).length > 0, "Fuel type is required.");
        require(bytes(_vin).length > 0, "VIN is required.");

        bytes32 vinHash = keccak256(abi.encodePacked(_vin, msg.sender));
        newCar.make = _make;
        newCar.model = _model;
        newCar.version = _version;
        newCar.year = _year;
        newCar.engineCapacity = _engineCapacity;
        newCar.countryOfOrigin = _countryOfOrigin;
        newCar.fuelType = _fuelType;
        newCar.vinHash = vinHash;
        newCar.stolen = false;
        newCar.modificationCount = 0;
        newCar.inspectionCount = 0;
        addressList.push(msg.sender);

        emit CarAdded(msg.sender, vinHash);
    }

    function addModification(
        address _carAddress,
        string memory _modifierName,
        string memory _modificationDetails,
        uint256 _costInUsd
    ) public {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist.");
        require(bytes(_modifierName).length > 0, "Modifier name is required.");
        require(bytes(_modificationDetails).length > 0, "Modification details are required.");
        require(_costInUsd > 0, "Cost in USD is required and must be greater than 0.");

        uint256 modId = car.modificationCount + 1;
        car.modifications[modId] = Modification({
            modId: modId,
            modificationDetails: _modificationDetails,
            modifierName: _modifierName,
            modifierAddress: msg.sender,
            modificationTimestamp: block.timestamp,
            costInUsd: _costInUsd
        });
        car.modificationCount = modId;

        emit ModificationAdded(_carAddress, modId);
    }

    function addInspection(
        address _carAddress,
        string memory _inspectorName,
        string memory _inspectionDetails,
        uint256 _mileage
    ) public {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist.");
        require(bytes(_inspectorName).length > 0, "Inspector name is required.");
        require(bytes(_inspectionDetails).length > 0, "Inspection details are required.");
        require(_mileage > 0, "Mileage is required and must be greater than 0.");

        uint256 inspId = car.inspectionCount + 1;
        car.inspections[inspId] = Inspection({
            inspectionId: inspId,
            inspectionDetails: _inspectionDetails,
            inspectorName: _inspectorName,
            inspectorAddress: msg.sender,
            inspectionTimestamp: block.timestamp,
            mileage: _mileage
        });
        car.inspectionCount = inspId;

        emit InspectionAdded(_carAddress, inspId);
    }

    function getCar(address _carAddress)
        public
        view
        returns (
            string memory make,
            string memory model,
            string memory version,
            uint256 year,
            uint256 engineCapacity,
            string memory countryOfOrigin,
            string memory fuelType,
            bytes32 vinHash,
            bool stolen,
            uint256 modificationCount,
            uint256 inspectionCount
        )
    {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");
        return (
            car.make,
            car.model,
            car.version,
            car.year,
            car.engineCapacity,
            car.countryOfOrigin,
            car.fuelType,
            car.vinHash,
            car.stolen,
            car.modificationCount,
            car.inspectionCount
        );
    }

    function getModifications(address _carAddress) public view returns (Modification[] memory) {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");

        uint256 count = car.modificationCount;
        Modification[] memory mods = new Modification[](count);

        for (uint256 i = 0; i < count; i++) {
            mods[i] = car.modifications[i + 1];
        }

        return mods;
    }

    function getInspections(address _carAddress) public view returns (Inspection[] memory) {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");

        uint256 count = car.inspectionCount;
        Inspection[] memory insp = new Inspection[](count);

        for (uint256 i = 0; i < count; i++) {
            insp[i] = car.inspections[i + 1];
        }

        return insp;
    }

    function setStolen(address _carAddress) public onlyOwner(_carAddress) {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");
        car.stolen = !car.stolen;

        emit CarStolenStatusUpdated(_carAddress, car.stolen);
    }

    function isStolen(address _carAddress) public view returns (bool) {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");
        return car.stolen;
    }

    function getAllCarAddresses() public view returns (address[] memory) {
        uint256 count = 0;
        address[] memory result = new address[](addressList.length);

        for (uint256 i = 0; i < addressList.length; i++) {
            if (bytes(cars[addressList[i]].make).length != 0) {
                result[count] = addressList[i];
                count++;
            }
        }

        assembly {
            mstore(result, count)
        }

        return result;
    }

    function getAllCars() public view returns (MinimalCar[] memory) {
        uint256 count = 0;
        MinimalCar[] memory minimalCarArray = new MinimalCar[](addressList.length);

        for (uint256 i = 0; i < addressList.length; i++) {
            address carAddress = addressList[i];
            Car storage car = cars[carAddress];
            
            if (bytes(car.make).length != 0) {
                minimalCarArray[count] = MinimalCar({
                    make: car.make,
                    model: car.model,
                    version: car.version,
                    year: car.year,
                    carAddress: carAddress
                });
                count++;
            }
        }

        assembly {
            mstore(minimalCarArray, count)
        }

        return minimalCarArray;
    }

    function checkVin(address _carAddress, string memory _vin) public view returns (bool) {
        Car storage car = cars[_carAddress];
        require(bytes(car.make).length > 0, "Car does not exist");
        bytes32 vinHash = keccak256(abi.encodePacked(_vin, _carAddress));
        return car.vinHash == vinHash;
    }
}