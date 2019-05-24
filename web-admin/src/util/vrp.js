import moment from 'moment'

export const formatDuration = duration => {
  let hours = Math.floor(duration / 3600)
  let minutes = Math.floor((duration - hours * 3600) / 60)
  let seconds = Math.floor(duration - hours * 3600 - minutes * 60)

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${hours}:${minutes}:${seconds}`
}

export const normalizeData = payload => {
  const { drivers, invoices } = payload
  const output = {
    depot: {
      capacity: 250,
      latitude: 20.995271,
      longitude: 105.780953,
      nbvehicles: drivers.length,
    },
    maxnodesperroute: 999,
    maxroutelength: 99999999,
    orderbalancing: false,
    session_key: 'Hihi Hehe',
    submittime: moment().unix(),
  }
  output.requests = []
  invoices.forEach(invoice => {
    output.requests.push({
      id: invoice.CustomerID,
      address: `${invoice.Address.StreetNumber}, ${invoice.Address.Street}, ${invoice.Address.District}, ${
        invoice.Address.City
      }`,
      demand: invoice.WeightTotal,
      latitude: invoice.Address.Lat,
      longitude: invoice.Address.Lng,
    })
  })
  return output
}

export const normalizeOutput = (solution, invoices) => {
  try {
    const { distance, duration } = solution
    const tours = solution.tours.reverse()
    const routes = tours.map((tour, tourIndex) => {
      const nodes = tour.customers.map(customer => ({
        id: customer.customerID,
        lat: customer.latitude,
        lng: customer.longitude,
        invoice: invoices.find(invoice => invoice.CustomerID === customer.customerID),
        driverRole: 2,
      }))
      return {
        nodes,
        depot: {
          lat: tour.depot.latitude,
          lng: tour.depot.longitude,
        },
        distance: tour.distance,
        weight: tour.weight,
        duration: tour.duration,
        numberOfOrder: tourIndex,
      }
    })
    return {
      distance,
      duration,
      routes,
    }
  } catch (e) {
    return null
  }
}
