// Copyright (c) YugaByte, Inc.

package com.yugabyte.yw.commissioner.tasks.upgrade;

import com.yugabyte.yw.commissioner.BaseTaskDependencies;
import com.yugabyte.yw.commissioner.KubernetesUpgradeTaskBase;
import com.yugabyte.yw.commissioner.UserTaskDetails.SubTaskGroupType;
import com.yugabyte.yw.forms.SoftwareUpgradeParams;
import com.yugabyte.yw.models.helpers.PlacementInfo;
import javax.inject.Inject;

public class SoftwareKubernetesUpgrade extends KubernetesUpgradeTaskBase {

  @Inject
  protected SoftwareKubernetesUpgrade(BaseTaskDependencies baseTaskDependencies) {
    super(baseTaskDependencies);
  }

  @Override
  protected SoftwareUpgradeParams taskParams() {
    return (SoftwareUpgradeParams) taskParams;
  }

  @Override
  public SubTaskGroupType getTaskSubGroupType() {
    return SubTaskGroupType.UpgradingSoftware;
  }

  @Override
  public void run() {
    runUpgrade(
        () -> {
          // Verify the request params and fail if invalid
          taskParams().verifyParams(getUniverse());
          // Create Kubernetes Upgrade Task
          PlacementInfo placementInfo =
              getUniverse().getUniverseDetails().getPrimaryCluster().placementInfo;
          createUpgradeTask(
              getUniverse(), placementInfo, taskParams().ybSoftwareVersion, true, true);
          // Run YSQL upgrade on the universe
          createRunYsqlUpgradeTask(taskParams().ybSoftwareVersion)
              .setSubTaskGroupType(getTaskSubGroupType());
          // Mark the final software version on the universe
          createUpdateSoftwareVersionTask(taskParams().ybSoftwareVersion)
              .setSubTaskGroupType(getTaskSubGroupType());
        });
  }
}
