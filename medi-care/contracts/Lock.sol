// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    // *********************************structs***********************************
    struct User {
        address walletAddress;
        string name;
        uint256 age;
        string gender;
        string[] medicalRecords;
        string[] medicalProofs;
        bool storeRecord;
        uint256[] providerRequests;
        uint256[] proverRequests; 
        uint256[] policies;    
    }

    struct Provider {
        address walletAddress;
        string name;
        string _address;
        string providerType;
        address[] patients;
        uint256 ratings;
    }

    struct InsuranceCompany {
        address walletAddress;
        string name;
        uint256 ratings;
        uint256 totalClaims;
        uint256 toatlCustomers;
        uint256[] policies;
        uint256[] claimsRequest;
    }

    struct Policy {
        string name;
        address companyAddress;
        string requirements;
        uint256 premium;
        uint256 compensation;
        uint256 totalSubscribers;
        uint256 totalClaims;
        address[] currentSubscribers;
    }

    struct Request {
        address user;
        address providers;
        string details;
        string status;
    }

    struct ClaimRequest {
        address user;
        uint policyId;
        string details;
        string status;
    }
    // ******************************************Mappings*************************
    mapping (address => User) users;
    mapping (address => Provider) providers;
    mapping (address => InsuranceCompany) insuranceCompanies;
    mapping (address => string) publicKeys;
    mapping (uint256 => Policy) policies;
    mapping (uint256 => Request) requests;
    mapping (uint256 => ClaimRequest) claimRequests;

    // ******************************************Variables********************
    uint256 totalUsers;
    uint256 totalProviders;
    uint256 totalInsuranceCompanies;
    uint256 totalPolicies;
    uint256 totalRequests;
    uint256 totalClaimsRequest;

    // ***************************************constructor******************
    constructor () {
        totalUsers = 0;
        totalProviders = 0;
        totalInsuranceCompanies = 0;
        totalPolicies = 0;
        totalRequests = 0;
        totalClaimsRequest = 0;
    }

    // ************************************User********************************
    function registerUser(string memory name,uint age,string memory gender,bool storeRecord, string memory publicKey) public {
        User memory user = User(address(msg.sender), name, age, 
        gender, new string[](0), new string[](0), storeRecord, 
        new uint256[](0), new uint256[](0), new uint256[](0));
        users[address(msg.sender)] = user;
        publicKeys[address(msg.sender)] = publicKey;
        totalUsers += 1;
    }

    function subscribeInsuranceCompany(uint256 id) public {
        users[address(msg.sender)].policies.push(id);
        policies[id].totalSubscribers += 1;
        policies[id].currentSubscribers.push(address(msg.sender));
        insuranceCompanies[address(policies[id].companyAddress)].toatlCustomers += 1;
    }

    modifier checkClaimAccountablity(uint256 id, address _address) {
        bool check = false;
        for(uint i = 0;i < policies[id].currentSubscribers.length;i++) {
            if(policies[id].currentSubscribers[i] == _address){
                check = true; 
                break;
            }
        }
        require(check,"Account is not eligible to claim given policy");
        _;
    }

    function claimInsurance(uint256 id) public checkClaimAccountablity(id,address(msg.sender)) {
        claimRequests[totalClaimsRequest] = ClaimRequest(address(msg.sender), id, "", "Pending");
        insuranceCompanies[address(policies[id].companyAddress)].claimsRequest.push(totalClaimsRequest);
        users[address(msg.sender)].proverRequests.push(totalClaimsRequest);
        totalClaimsRequest += 1;
    }

    function decisonRequest(uint id, bool isAccept) public {
        if(isAccept) {
            requests[id].status = "accept";
        } else {
            requests[id].status = "decline";
        }
    }

    function getProviderRequests() public view returns (uint[] memory)  {
        return users[address(msg.sender)].providerRequests;
    }
 
    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }

    function getPoliciesSubscribed() public view returns (uint256[] memory) {
        return users[address(msg.sender)].policies;
    }

    // ***********************************Provider********************************

    function registerProvider(string memory name,string memory _address,string memory providerType, string memory publicKey) public {
        providers[address(msg.sender)] = Provider(address(msg.sender), name, _address, providerType, new address[](0), 0);
        publicKeys[address(msg.sender)] = publicKey;
        totalProviders += 1;
    }    

    function getProvider(address providerAddress) public view returns (Provider memory)   {
        return providers[providerAddress];
    }

    function getPatientsOfProvider() public view returns (address[] memory) {
        return providers[address(msg.sender)].patients;
    }

    function createRequest(address patientAddress, string memory details) public {
        requests[totalRequests] = Request(patientAddress,address(msg.sender),details,"Pending");
        users[address(msg.sender)].providerRequests.push(totalRequests);
        providers[address(msg.sender)].patients.push(patientAddress);
        totalRequests += 1;
    }

    // **************************************Insurance*****************************

    function registerInsuranceCompany(string memory name, string memory publicKey) public {
        InsuranceCompany memory insuranceCompany = InsuranceCompany(address(msg.sender), name, 0, 0, 0, new uint256[](0), new uint256[](0));
        insuranceCompanies[address(msg.sender)] = insuranceCompany;
        publicKeys[address(msg.sender)] = publicKey;
        totalInsuranceCompanies += 1;
    }

    function getInsuranceCompanyDetails(address _address) public view returns (InsuranceCompany memory) {
        return insuranceCompanies[_address];
    }

    function getInsurancePolicies() public view returns (Policy[] memory) {
        Policy[] memory _policies = new Policy[](insuranceCompanies[address(msg.sender)].policies.length);
        for(uint256 i = 0; i < insuranceCompanies[address(msg.sender)].policies.length; i++) {
            _policies[i] = policies[insuranceCompanies[address(msg.sender)].policies[i]];
        }
        return _policies;
    }

    function getClaimsRequest() public view returns (ClaimRequest[] memory) {
        uint256 n = insuranceCompanies[address(msg.sender)].claimsRequest.length;
        ClaimRequest[] memory _claimRequests = new ClaimRequest[](n);
        for(uint256 i=0; i< n; i++) {
            _claimRequests[i] = claimRequests[i];
        }
        return _claimRequests;
    }

    function acceptRequest(bool isAccepted, uint256 _id) public {
        if(isAccepted) {
            requests[_id].status = "accept";
        } else {
            requests[_id].status = "decline";
        }
    }
    function addPolicy(string memory name, uint256 premium, uint256 compensation, string memory requirements) public {
        policies[totalPolicies] = Policy({
        name: name,
        companyAddress: address(msg.sender),
        requirements: requirements,
        premium: premium,
        compensation: compensation,
        totalSubscribers: 0,
        totalClaims: 0,
        currentSubscribers: new address[](0)
    });
        insuranceCompanies[address(msg.sender)].policies.push(totalPolicies);
        totalPolicies += 1;
    }
}
