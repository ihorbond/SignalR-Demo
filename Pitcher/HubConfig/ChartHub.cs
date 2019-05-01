using Microsoft.AspNetCore.SignalR;
using Pitcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pitcher.HubConfig
{
    public class ChartHub: Hub
    {
        public async Task BroadcastChartData(List<ChartModel> data) =>
            await Clients.All.SendAsync("broadcastchartdata", data).ConfigureAwait(false);
    }
}
