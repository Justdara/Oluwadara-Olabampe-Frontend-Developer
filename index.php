<?php
    class SpaceXAPI {
        private $baseURL = "https://api.spacexdata.com/v3/";
    
        public function getCapsules($capsuleSerial, $type, $status) {
            $url = $this->baseURL . "capsules";
            
            $queryParams = http_build_query([
                'capsule_serial' => $capsuleSerial,
                'type' => $type,
                'status' => $status
            ]);
    
            $response = file_get_contents($url . '?' . $queryParams);
            return json_decode($response, true);
        }
    }
    
    class MySpaceXAPI {
        private $spaceXAPI;
        private $authorizedUsers = [
            'root' => 'basic123'
        ];
    
        public function __construct() {
            $this->spaceXAPI = new SpaceXAPI();
        }
    
        private function isAuthorized($username, $password) {
            return isset($this->authorizedUsers[$username]) && $this->authorizedUsers[$username] === $password;
        }
    
        public function getCapsules($username, $password, $capsuleSerial, $type, $status) {
            if ($this->isAuthorized($username, $password)) {
                return $this->spaceXAPI->getCapsules($capsuleSerial, $type, $status);
            } else {
                return ['error' => 'Unauthorized'];
            }
        }
    }

if ($_SERVER['REQUEST_URI'] === '/api') {
    $mySpaceXAPI = new MySpaceXAPI();
    
    $username = $_SERVER['PHP_AUTH_USER'] ?? '';
    $password = $_SERVER['PHP_AUTH_PW'] ?? '';
    
    $capsules = $mySpaceXAPI->getCapsules($username, $password, 'C101', 'Dragon 1.0', 'retired');
    
    header('Content-Type: application/json');
    echo json_encode($capsules, JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo 'Not Found';
}
?>

