angular.module("App").controller("HostingDatabaseRestoreCtrl", ($scope, $stateParams, Alerter, HostingDatabase) => {
    "use strict";

    $scope.bdd = angular.copy($scope.currentActionData.bdd);
    $scope.dump = angular.copy($scope.currentActionData.dump);
    $scope.loading = false;

    $scope.restoreBDD = function () {
        $scope.loading = true;
        HostingDatabase.restoreBDD($stateParams.productId, $scope.bdd.name, $scope.dump)
            .then(
                () => {
                    Alerter.success($scope.tr("database_tabs_dumps_restore_in_start"), $scope.alerts.dashboard);
                },
                (err) => {
                    Alerter.alertFromSWS($scope.tr("database_tabs_dumps_restore_fail"), err, $scope.alerts.dashboard);
                }
            )
            .finally(() => {
                $scope.loading = false;
                $scope.resetAction();
            });
    };
});
